export function renameImages(image: any, prefix: string) {
    const newName = new File(
        [image],
        (prefix) + Date.now().toString() + "." + image.name.split('.').pop(),
        { type: image.type }
    );
    return newName;
}