// Script to create GitHub repo for AI Marketing Tools Directory
import { getUncachableGitHubClient } from '../server/github';

async function createRepo() {
  try {
    const octokit = await getUncachableGitHubClient();
    
    // Get authenticated user info
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`Authenticated as: ${user.login}`);
    
    // Create the repository
    const repoName = 'ai-marketing-tools-directory';
    const { data: repo } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: 'AI-powered marketing tools directory - helping marketers discover solutions for creative, analytics, attribution, and data enablement',
      private: false,
      has_issues: true,
      has_wiki: false,
      auto_init: false,
    });
    
    console.log(`Repository created: ${repo.html_url}`);
    console.log(`Clone URL: ${repo.clone_url}`);
    console.log(`SSH URL: ${repo.ssh_url}`);
    
    return repo;
  } catch (error: any) {
    if (error.status === 422) {
      console.log('Repository may already exist. Fetching existing repo...');
      const octokit = await getUncachableGitHubClient();
      const { data: user } = await octokit.users.getAuthenticated();
      const { data: repo } = await octokit.repos.get({
        owner: user.login,
        repo: 'ai-marketing-tools-directory'
      });
      console.log(`Existing repository: ${repo.html_url}`);
      return repo;
    }
    console.error('Error creating repository:', error.message);
    throw error;
  }
}

createRepo();
