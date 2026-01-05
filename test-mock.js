import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test JSON validity
try {
    const mockDataPath = path.join(__dirname, 'mock-data', 'linkedin-posts.json');
    const data = fs.readFileSync(mockDataPath, 'utf8');
    const posts = JSON.parse(data);

    console.log('JSON válido');
    console.log(`Número de posts: ${posts.length}`);

    // Test filter function
    const testUsername = 'johndoe';
    const ownPosts = posts.filter(item => {
        const isOwnPost = item.post_type === 'regular';
        const isAuthor = item.author.username === testUsername;
        return isOwnPost && isAuthor;
    });

    console.log(`Posts filtrados para ${testUsername}: ${ownPosts.length}`);

    // Show sample post
    if (ownPosts.length > 0) {
        const post = ownPosts[0];
        console.log('Primer post:');
        console.log(`   Texto: ${post.text.substring(0, 50)}...`);
        console.log(`   Reacciones: ${post.stats.total_reactions}`);
        console.log(`   Comentarios: ${post.stats.comments}`);
        console.log(`   Tiene media: ${!!post.media}`);
    }

} catch (error) {
    console.error('Error:', error.message);
}