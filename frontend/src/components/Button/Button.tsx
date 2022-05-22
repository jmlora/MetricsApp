import React from 'react';
import * as S from './Button.styles';

type ButtonType = {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    type?: "button" | "submit" | "reset" | undefined,
    children?: React.ReactNode | React.ReactNode[] | React.ReactPortal | boolean | null | undefined,
}

function Button({
    onClick,
    type = "button",
    children,
}:ButtonType) {
    return <S.Button type={type} onClick={onClick}>{children}</S.Button>
}

export { Button }