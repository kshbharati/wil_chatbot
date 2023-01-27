"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { API_URI } from "@/constants/*";
import { parseCookies, setCookie } from "nookies";

export default function AdminLogin() {
    const cookies = parseCookies();

    const router = useRouter();

    let [navToDash,setNavToDash]= React.useState(false);
    if (cookies.loggedInUser) {
        router.push("/admin")
    }

    let [loading, setLoading] = React.useState(false);
    let [message, setMessage] = React.useState("");
    let [error, setError] = React.useState(false);
    let username = React.useRef(null);
    let password = React.useRef(null);

    const setFormDefault = () => {
        setLoading(true);
        setError(false);
        setMessage("");
    };

    const setFormError = (message) => {
        setError(true);
        setMessage(message);
        setLoading(false);
    };

    const handleLogin = async () => {
        setFormDefault();

        if (
            username?.current?.value?.length < 6 ||
            password?.current?.value?.length < 6
        ) {
            setFormError("Entered value might not be correct!");
        }

        const data = {
            username: username?.current.value,
            password: password?.current.value,
        };

        const response = await fetchUser(data);
        if (response.status === 404) {
            setFormError("User Not Found");
            return;
        }

        const returnedData = await response.json();
        if (!returnedData?.id) {
            setFormError("Server Error. Please Try Again Later");
            return;
        }

        setCookie(null, "loggedInUser", returnedData.id, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/admin",
        });

        router.push("/admin")
    };

    async function fetchUser(data) {
        const response = await fetch(API_URI + "/api/user/login", {
            method: "POST",
            body: JSON.stringify(data),
        });
        return response;
    }

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center content-center">
            <div>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className="flex flex-col">
                        <TextField
                            id="username"
                            label="Email"
                            variant="filled"
                            className="rounded-xl"
                            color="primary"
                            inputRef={username}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            variant="filled"
                            className="rounded-xl"
                            color="primary"
                            type="password"
                            inputRef={password}
                        />
                        {error && (
                            <div className="flex p-4 text-red-700 justify-center">
                                {message}
                            </div>
                        )}

                        <div className="flex flex-row justify-center space-x-4">
                            <Button
                                id="loginButton"
                                variant="outlined"
                                onClick={handleLogin}
                                disabled={loading}
                            >
                                Login
                            </Button>
                            <div
                                id="loginSpinner"
                                className={loading ? "visible" : "hidden"}
                            >
                                <div
                                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
}
