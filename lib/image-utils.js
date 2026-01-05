import https from 'https';
import http from 'http';

/**
 * Fetch an image from a URL and convert it to base64
 * @param {string} url - Image URL
 * @returns {Promise<string>} Base64 encoded image with data URI prefix
 */
export async function fetchImageAsBase64(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            const data = [];
            res.on('data', (chunk) => data.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(data);
                resolve(`data:image/jpeg;base64,${buffer.toString('base64')}`);
            });
        }).on('error', reject);
    });
}
