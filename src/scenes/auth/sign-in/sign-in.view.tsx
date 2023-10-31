"use client"
import {ChangeEvent, FormEvent, useState} from "react";
import {signIn} from "next-auth/react";

type FormFields = {
    username: string;
    password: string;
    // Add more fields if needed
};

export const SigninView = () => {
    const [fieldsValue, setFieldsValue] = useState<FormFields>({
        username: "",
        password: ""
    })

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        setFieldsValue((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await signIn("credentials", {
            redirect: false,
            username: fieldsValue.username,
            password: fieldsValue.password,
        });

    }

    return (
        <div className="sign-in">
            <form onSubmit={onSubmit}>
                <input placeholder="username" name="username" value={fieldsValue.username} onChange={onValueChange}/>
                <input placeholder="password" name="password" value={fieldsValue.password} onChange={onValueChange}/>

                <button type="submit">submit</button>
            </form>
        </div>
    )
}