
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
      .map(email => email.trim())
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
