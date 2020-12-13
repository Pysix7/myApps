export interface IMessageFormValues { message: string };

export interface IMessage {
    key: string;
    msg: string;
    user: string;
}

export interface ILoginFormValues {
    username: string;
    password: string;
};

export interface ISignupFormValues {
    username: string;
    password: string;
    email: string;
}