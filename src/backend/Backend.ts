import { Decoration, Tree } from "./Tree";
import { User } from "./User";

export const url = "https://dongho.loca.lt";

interface APIResponse {
    isSuccess: boolean
    code: number
    message: string
}

interface UserResponse extends APIResponse {
    result: User
}

export const fetchUser = async (id: string, password: string): Promise<UserResponse | undefined> => {
    const body = {
        id: id,
        password: password
    }

    const config: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }

    const response = await fetch(`${url}/sign-in`, config);

    const json = await response.json();

    return json as UserResponse;
}

export interface TreeResponse extends APIResponse {
    treeOwnerNickname: string
    result: Decoration[]
}

export const fetchTree = async (idx: number): Promise<TreeResponse | undefined> => {
    const config: RequestInit = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }
    }

    const response = await fetch(`${url}/trees/${idx}`, config);

    const json = await response.json();

    return json as TreeResponse;
}

export const authWithEmail = async (id: string): Promise<APIResponse | undefined> => {
    const body = {
        id: id
    }

    const config: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    }

    console.log(config);

    const response = await fetch(`${url}/api/send-email`, config);

    console.log(response);

    const json = await response.json();

    return json as APIResponse;
}

export interface CodeResponse extends APIResponse {
    result: boolean
}

export const checkCode = async (authNum: number): Promise<CodeResponse | undefined> => {
    const body = {
        authenticationNumber: authNum
    }

    const config: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    }

    const response = await fetch(`${url}/api/send-email/check`, config);

    const json = await response.json();

    return json as CodeResponse;
}

export const signUp = async ( nickname: string, password: string ): Promise<APIResponse | undefined> => {
    const body = {
        nickname: nickname,
        password: password
    }

    const config: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    }

    const response = await fetch(`${url}/sign-up`, config);

    const json = await response.json();

    return json as APIResponse;
}

export interface EditSetUpResponse extends APIResponse {
    result: string
}

export const setUpEdit = async (idx: number, jwt: string): Promise<EditSetUpResponse | undefined> => {
    const config: RequestInit = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": jwt,
        },
        credentials: "include"
    }

    const response = await fetch(`${url}/users/edit/${idx}`, config);

    const json = await response.json();

    return json as EditSetUpResponse;
}

export const editUser = async (idx: number, jwt: string, nickname: string, password: string): Promise<APIResponse | undefined> => {
    const body = {
        nickname: nickname,
        password: password
    }

    const config: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": jwt,
        },
        credentials: "include",
        body: JSON.stringify(body)
    }

    const response = await fetch(`${url}/users/edit/${idx}`, config);

    const json = await response.json();

    return json as APIResponse;
}