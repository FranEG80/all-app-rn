import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import {
    readDir,
    writeFile,
    unlink,
    uploadFiles, //? only on Android and iOS
    downloadFile, //? only on Android and iOS
    CachesDirectoryPath,
    DocumentDirectoryPath,
    TemporaryDirectoryPath,
    copyFile,
    copyFolder, //! don0t work for window, use copyFile instead
    exists,
    mkdir,
    moveFile,
    pickFile, //! read doc for MacOS 
    read,
    MainBundlePath,
    stat,
} from '@dr.pogodin/react-native-fs'

// import DocumentPicker, {
//     DirectoryPickerResponse,
//     DocumentPickerResponse,
//     isCancel,
//     isInProgress,
//     types,
//   } from 'react-native-document-picker'


export default function useFileSystem() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const platform = Platform.OS
    //!!! changes on iOS pending  https://dr.pogodin.studio/docs/react-native-file-system

    //!!! read BEWARES AND WARNINGS ON https://www.npmjs.com/package/@dr.pogodin/react-native-fs

    const getFullPath = (path: string|undefined) => {
        if (!path) path = ''
        if (path && !path.startsWith('/')) path = '/' + path
        return DocumentDirectoryPath + path
    }

    const read_dir = async (path: string|undefined) => {
        path = getFullPath(path)
        try {
            let output = []
            const result = await readDir(MainBundlePath ?? DocumentDirectoryPath)
            
            // const promises = await Promise.all(result.map(file => [stat(file.path), file.path]))
            // promises.forEach(promise => {
            //     const [stat, path]: Array<[stat: File, path: string]> = promise
            //     output.push({ stat, path })
            //     output.push({ 
            //         stat, 
            //         path, 
            //         name: stat.name ?? path.split('/').pop() 
            //     })

            // })
            return result
        } catch (error: any) {
            setError(error.message)
            return []
        }
    }

    const create_dir = async (path: string) => {
        path = getFullPath(path)
        try {
            await mkdir(path)
            return true
        } catch (error: any) {
            setError(error.message)
            return false
        }
    }

    const delete_dir = async (path: string) => {
        path = getFullPath(path)
        try {
            await unlink(path)
            return true
        } catch (error: any) {
            setError(error.message)
            return false
        }
    }

    const copy_dir = async (src: string, dest: string) => {
        src = getFullPath(src)
        dest = getFullPath(dest)
        try {
            await copyFolder(src, dest)
            return true
        } catch (error: any) {
            setError(error.message)
            return false
        }
    }

    const read_file = async (path: string) => {
        path = getFullPath(path)
        try {
            const result = await read(path)
            return result
        } catch (error: any) {
            setError(error.message)
            return []
        }
    }

    const write_file = async (path: string, data: string) => {
        path = getFullPath(path)
        try {
            await writeFile(path, data , 'utf8')
            return true
        }
        catch (error: any) {
            setError(error.message)
            return false
        }
    }

    const delete_file = async (path: string) => {
        path = getFullPath(path)
        try {
            await unlink(path)
            return true
        } catch (error: any) {
            setError(error.message)
            return false
        }
    }

    const copy_file = async (src: string, dest: string) => {
        src = getFullPath(src)
        dest = getFullPath(dest)
        try {
            await copyFile(src, dest)
            return true
        } catch (error: any) {
            setError(error.message)
            return false
        }
    }

    const move_file = async (src: string, dest: string) => {
        src = getFullPath(src)
        dest = getFullPath(dest)
        try {
            await moveFile(src, dest)
            return true
        } catch (error: any) {
            setError(error.message)
            return false
        }
    }

    const pick_file = async (options: {
        mimetypes?: string[],
        allowMultiSelection?:boolean,
    }) => {
        console.log('pick_file', options)
        let picker, opts;
        if (platform === 'windows') {
            Alert.alert('Windows', 'File picker not implemented yet')
            throw new Error('File picker not implemented yet')
            // opts = {
            //     allowMultiSelection: options.allowMultiSelection ?? false,
            //     type: options.mimetypes ?? ['*/*']
            // }
            // picker = DocumentPicker.pick

            
        } else {
            opts = {
                mimeTypes: options.mimetypes ?? ['*/*']
            }
            picker = pickFile
            
        }
        try {
            const result = await picker(opts)
            return result
        } catch (error: any) {
            console.log(error.message)
            setError(error.message)
            return false
        }
    }

    // const upload_files = async (files: string[], dest: string) => {
    //     dest = getFullPath(dest)
    //     try {
    //         await uploadFiles(files)
    //         return true
    //     } catch (error: any) {
    //         setError(error.message)
    //         return false
    //     }
    // }

    return {
        readDir: read_dir,
        createDir: create_dir,
        deleteDir: delete_dir,
        copyDir: copy_dir,
        readFile: read_file,
        writeFile: write_file,
        deleteFile: delete_file,
        copyFile: copy_file,
        moveFile: move_file,
        pickFile: pick_file,
        error,
        loading,
    };
}
