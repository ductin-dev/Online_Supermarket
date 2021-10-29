export function fileToBase64(file: any, callback: (res: any) => void) {
    if (file) {
        var reader = new FileReader();
        reader.onload = () => {
            callback(reader.result);
        };
        reader.onerror = function (error) {
            callback('Read error');
        };
        reader.readAsDataURL(file);
    }
    callback('Not file');
}
