const useGetPopulate = () => {
    return {
        setPopulate: ({formState, blog, blogId, setFormState}) => {
            if(blog) {
                if(blog._id === blogId) {
                    const cloneFormKey = {...formState};
                    for(let key in cloneFormKey) {
                        switch (cloneFormKey[key].elementType) {
                            case 'select':
                            case 'multiselect':
                                cloneFormKey[key].value = blog[key];
                                cloneFormKey[key].valid = true;
                            break;
                            case 'file':
                                cloneFormKey[key].value = Object.keys(blog[key]).length ? JSON.parse(blog[key]) : [];
                                cloneFormKey[key].valid = true;
                            break;
                            default:
                                cloneFormKey[key].value = blog[key];
                                cloneFormKey[key].valid = true;
                            break;
                        }
                    }
                    setFormState(cloneFormKey);
                }
            }
        }
    }
}
/*
const useHook = ({formState, blog, blogId, setFormState}) => {
    if(blog) {
        if(blog._id === blogId) {
            const cloneFormKey = {...formState};
            for(let key in cloneFormKey) {
                switch (cloneFormKey[key].elementType) {
                    case 'select':
                    case 'multiselect':
                        cloneFormKey[key].value = blog[key];
                        cloneFormKey[key].valid = true;
                    break;
                    case 'file':
                        cloneFormKey[key].value = Object.keys(blog[key]).length ? JSON.parse(blog[key]) : [];
                        cloneFormKey[key].valid = true;
                    break;
                    default:
                        cloneFormKey[key].value = blog[key];
                        cloneFormKey[key].valid = true;
                    break;
                }
            }
            setFormState(cloneFormKey);
        }
    }
}*/

export default useGetPopulate;