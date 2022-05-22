import styled from 'styled-components';

export const Content = styled.div`
    background-color: var(--surface-overlay);
    border-radius: 5px;
    box-shadow: 0 3px 5px rgba(0,0,0,.02),0 0 2px rgba(0,0,0,.05),0 1px 4px rgba(0,0,0,.08);
    display: flex;
    justify-content: center;
    height: calc(100vh - 8rem);
    left: 2rem;
    overflow-y: auto;
    padding: 1.5rem;
    position: fixed;
    right: 2rem;
    top: 7rem;
`

export const FeedBack = styled.div`
    text-align: center;
    width: 100%;
`

export const LeftColumn = styled.div`
    width: calc(300px);
`

export const RightColumn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-left: 50px;
    width: calc(100vw - 300px);
`