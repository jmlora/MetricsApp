import React from 'react';
import * as S from './Input.styles';

type InputType = {
    type: string,
    placeholder: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

function Input({
    type,
    placeholder,
    onChange
}:InputType) {
    return <S.Input type={type} placeholder={placeholder} onChange={onChange} />
}

export { Input }