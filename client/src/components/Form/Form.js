import React, { useState,useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64"
import useStyles from "./styles"
import { useDispatch } from "react-redux";
import { createPost ,updatePost} from '../../actions/posts'
import { useSelector } from "react-redux";

const Form = ({currentId,setCurrentId}) => {
    const [postData, setPostData] = useState({
        creator: '', dogName: '', message: '', tags: '', selectedFild: ''
    })

    const post=useSelector((state=>currentId?state.posts.find((x)=>x._id===currentId):null))

    const classes = useStyles();
    const dispatch = useDispatch()
    useEffect(()=>{
        if(post)setPostData(post)
    },[post])
    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId,postData))
        }else{
dispatch(createPost(postData))

        }
    }
    const clear = () => { }
    return (
        <Paper className={classes.paper}>
            <div autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">share your dog joy</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name="dogName" variant="outlined" label="dogName" fullWidth value={postData.dogName} onChange={(e) => setPostData({ ...postData, dogName: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFild: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </div>
        </Paper>
    )
}
export default Form