import React, { ButtonHTMLAttributes, useReducer } from "react";
import postReducer from "@/utils/postReducer";
import { BlogActionType } from "@/utils/postReducer";
import Router from "next/router";
const initialState = {
  title: "",
  description: "",
  body: "",
};

const NewBlog = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [newPost, dispatch] = useReducer(postReducer, initialState);

  const handleTitle = (event: React.FormEvent<HTMLInputElement>) =>
    dispatch({
      type: BlogActionType.SET_TITLE,
      payload: event.currentTarget.value,
    });

  const handleDescription = (event: React.FormEvent<HTMLInputElement>) =>
    dispatch({
      type: BlogActionType.SET_DESCRIPTION,
      payload: event.currentTarget.value,
    });

  const handleBody = (event: React.FormEvent<HTMLTextAreaElement>) =>
    dispatch({
      type: BlogActionType.SET_BODY,
      payload: event.currentTarget.value,
    });

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    // const { data, status } = await ArticleAPI.create(
    //   posting,
    //   currentUser?.token
    // );

    setLoading(false);

    // if (status !== 200) {
    //   setErrors(data.errors);
    // }

    Router.push("/");
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Article Title"
                value={newPost.title}
                onChange={handleTitle}
              />

              <input
                className="form-control"
                type="text"
                placeholder="What's this article about?"
                value={newPost.description}
                onChange={handleDescription}
              />

              <textarea
                className="form-control"
                rows={8}
                placeholder="Write your article (in markdown)"
                value={newPost.body}
                onChange={handleBody}
              />

              <button
                className="btn btn-lg pull-xs-right btn-primary"
                type="button"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Publish Article
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
