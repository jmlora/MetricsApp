import React from 'react';
import * as S from './FormContainer.styles';

type FormContainerType = {
    children?: React.ReactNode | React.ReactNode[] | React.ReactPortal | boolean | null | undefined,
}

function FormContainer({
    children
}: FormContainerType) {
    return <S.FormContainer>{children}</S.FormContainer>
}

export { FormContainer }