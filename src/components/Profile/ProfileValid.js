export const avatarValid = (payload) => {
    let err = ''
    if (!payload) {
        err = 'no file is selected!'
    }
    if (payload?.type !== "image/jpeg" || !payload?.type === "image/png") {
        err = 'file format is not correct!'
    }
    if (payload?.size > 1024 * 1024) {
        err = 'too much big file..'
    }
    return err
}

export const updateProfileVAlid = (payload) => {
    const { fullname, story } = payload;
    const err = {};
    if (!fullname) {
        err.fullname = 'fullname is required!'
    } else if (fullname.length > 25) {
        err.fullname = 'no more than 25 letters allowed!'
    }
    if (story.length > 300) {
        err.story = 'no more than 300 words allowed!'
    }
    return err;
}