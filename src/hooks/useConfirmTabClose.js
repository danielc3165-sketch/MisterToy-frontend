import { useEffect } from 'react'

export function useConfirmTabClose(hasChange) {
    useEffect(() => {
        if (!hasChange) return

        function handleBeforeUnload(ev) {
            ev.preventDefault()
            ev.returnValue = ''
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [hasChange])
}
