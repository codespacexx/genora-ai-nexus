
/**
 * Service to verify premium users against an approved email list
 */

/**
 * Fetches the list of approved premium emails from GitHub
 */
export async function fetchApprovedEmails(): Promise<string[]> {
  try {
    const response = await fetch('https://raw.githubusercontent.com/codespacexx/main1/refs/heads/main/Fr.text');
    
    if (!response.ok) {
      throw new Error('Failed to fetch approved emails list');
    }
    
    const text = await response.text();
    // Split by newline and filter out empty lines
    return text
      .split('\n')
      .map(email => email.trim().toLowerCase())
      .filter(email => email && email.includes('@'));
    
  } catch (error) {
    console.error('Error fetching approved emails:', error);
    return [];
  }
}

/**
 * Checks if an email is in the approved premium list
 */
export async function isPremiumApproved(email: string): Promise<boolean> {
  if (!email) return false;
  
  try {
    const approvedEmails = await fetchApprovedEmails();
    return approvedEmails.includes(email.trim().toLowerCase());
  } catch (error) {
    console.error('Error checking premium status:', error);
    return false;
  }
}

/**
 * Adds an email to the approved premium list
 * This would require server-side implementation in a real app
 * This is just a simulation for demo purposes
 */
export async function addEmailToPremiumList(email: string): Promise<boolean> {
  // In a real app, this would use an authenticated API call to add the email to the list
  console.log('Adding email to premium list:', email);
  // Since we can't actually modify the GitHub file directly, we'll simulate success
  return true;
}

/**
 * Activates premium subscription for a user
 * This is called on login/register to automatically check status
 */
export async function checkAndActivatePremium(email: string, 
  updateUserFn: (data: { isPremium: boolean }) => void, 
  setPremiumFn: (isPremium: boolean) => void): Promise<boolean> {
  
  if (!email) return false;
  
  try {
    const isApproved = await isPremiumApproved(email);
    
    if (isApproved) {
      // Update both local state and the user object
      setPremiumFn(true);
      updateUserFn({ isPremium: true });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error activating premium status:', error);
    return false;
  }
}
