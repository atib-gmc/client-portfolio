import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function MyDropzone({
    setImages,
}: {
    setImages: React.Dispatch<React.SetStateAction<File[]>>
}) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const imageFiles = acceptedFiles.filter(file =>
            file.type.startsWith('image/')
        )

        setImages(prev => [...prev, ...imageFiles])
    }, [setImages])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        }
    })

    return (
        <div
            {...getRootProps()}
            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the images here...</p>
            ) : (
                <p>Drag & drop images here, or click to select</p>
            )}
        </div>
    )
}
