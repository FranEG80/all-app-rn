import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

const XDAM_URI = 'https://xdam.mhe.ximdex.net/api/v1'
const SCORM_URI = 'https://scorm.mhe.ximdex.net/api'

const getRenderFullUrl = (hash) => `${XDAM_URI}/resource/render/${hash}`
const getDownloadPath = (id) => `${SCORM_URI}/editor/downloadWithAssets/${id}`

const useXDAM = () => {
    const [resources, setResorces] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchXDAM = async () => {
        setLoading(true)
        try {
            let res = []
            const response = await fetch(XDAM_URI + '/catalogue/5?page=1&search=&limit=48&facets[active][]=All&facets[isbn][]=9788448641603&facets[isbn][]=9788448644338&facets[isbn][]=00000000000&' , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNjc1NmE1NmMyMDM3YTAzNDA3OGFkYjNhYzUyNDFiMGM1OGE5MWUxOWI0OGE5MTg3Yjc3ZGRlNzMzOGJiMTQ3ZmRmZDA0OGE1NjNiNjFhMDIiLCJpYXQiOjE3MTI3MzIxNzAuMTkxMDgyLCJuYmYiOjE3MTI3MzIxNzAuMTkxMDg0LCJleHAiOjE3Mjg1NDMzNjkuOTEwNDQzLCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.mm8gx5TqgodFODMhIU3TuWM9dFz2JvNAooG0BT8znhk7axDmqwsPrvUDCt6Y9bJhLs82PiwZmz-vbS1US6BsLdb2k0jQ-oEkl81cJrBF04UN3IuFZNHl_XKER83B1XeVvygqLe3b0Clh58-22iUar8ZcS0OPaXoWhngmFj6D9dTmZTawF9h1pJi-w7mpPY09yaGLJNJl7MOx_61yZrWZ4-_kY-AFRpn4ICDXOAVmkMB4mlzdUIqcMB6UG44gjxJSnre87iB28sPXgplPN6mV_mkRelAoYeex7WFp-J0XN72uTeS9ZLTphCl5VCtE6xRDLDeD9hOZQH5mTKOYnA85Cc4eb2LzkLDf4aZNO5poSMj9rP9isGLoflIF4KLpR4rlqS2ROMeEIE9zl_YtuYtcmwwGrZj6zT91-GSVXBkLtPiAMfsO1N95JpXYuU_SdSMXVeHGFijB0uTLfSMWUP-BbZoPiHtIrv8lH0NOgszCHk8gYxfLIMWnCz2La8vAlmTKAr1IaY9meL_Mue-Q6gZ2L_HRRvpMj9EMGnrl9H1iWzz2cmVes6lgZLLpFH6nNsKf8s524w4UegXSRXbmWJEZcYiiQOLTLbvaDBH_vAtkrxykBf_1W0tO3z4FVe_WmF8qNlY4dl_rGnGkZrfK0MNRqWYWWp8oPACmeY8ZRIARzJ4'
                }
            })
            const {data} = await response.json()
            data.forEach(resource => {
                res.push({
                    id: resource.id,
                    title: resource.data.description.name ?? resource.name,
                    units: resource.units ?? [],
                    isbns: resource.isbn ?? [],
                    thumbnail: getRenderFullUrl(resource.previews[0]),
                    downloadPath: getDownloadPath(resource.id)
                })
            });
            setResorces(res)
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (resources.length === 0) fetchXDAM()
    }, [])

    return ({
        resources,
        loading,
        error
    })
}

export default useXDAM