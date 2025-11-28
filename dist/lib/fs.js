import fs from 'fs';
const fsLib = {
    path: {
        archive: 'archive'
    },
    ensureDir: (dirPath) => {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    },
    publicArchivePath: (userId) => {
        return '/public/archive' + (userId ? `/${userId}` : '');
    }
};
export default fsLib;
