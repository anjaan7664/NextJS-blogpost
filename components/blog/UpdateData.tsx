import axios from "axios";
import Router from "next/router";
import React from "react";



const UpdateData = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });




  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // const user = { ...userInfo };

    // if (!user.password) {
    //   delete user.password;
    // }

    // const { data, status } = await axios.put(
    //   `${SERVER_BASE_URL}/user`,
    //   JSON.stringify({ user }),
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Token ${currentUser?.token}`,
    //     },
    //   }
    // );

    // setLoading(false);

    // if (status !== 200) {
    //   setErrors(data.errors.body);
    // }

    // if (data?.user) {
    //   window.localStorage.setItem("user", JSON.stringify(data.user));
    //   mutate("user", data.user);
    //   Router.push(`/`);
    // }
  };

  return (
    <React.Fragment>
      <form onSubmit={submitForm}>
        <fieldset>
     
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={userInfo.username}
              onChange={()=>{}}
            />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              value={userInfo.bio}
              onChange={()=>{}}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={()=>{}}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={userInfo.password}
              onChange={()=>{}}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={isLoading}
          >
            Update Settings
          </button>
        </fieldset>
      </form>
    </React.Fragment>
  );
};

export default UpdateData;
