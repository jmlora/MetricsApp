import React, { useEffect, useState } from 'react';
import * as S from './Content.styles';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { FormContainer } from '../FormContainer/FormContainer';
import { getFetch, postFetch } from '../../api/baseFetch';
import { MetricsTable } from '../MetricsTable/MetricsTable';
import { IPoint } from '../../Interfaces/IPoint';

type MetricType = {
    temp: string
}

type PostApiResponse = {
    result: string
}

function Content() {
    const [measure, setMeasure] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [data, setData] = useState<IPoint[]>([]);
    const [groupData, setGroupData] = useState(false);

    const url = 'http://localhost/metrics';

    useEffect(() => {
        getFetch<IPoint[]>(url)
            .then((resp) => setData(resp))
    }, []);

    useEffect(() => {
        getFetch<IPoint[]>(groupData ? `${url}?groupBy=date` : url)
        .then((resp) => setData(resp))

    }, [groupData]);

    const handleClickGroup = () => {
        setGroupData(!groupData);
    }

    const handleSubmit = () => {
        postFetch<MetricType, PostApiResponse>(url, {temp: measure})
        .then(() => {
            setResponseMessage("Value inserted");
            let timer = setTimeout(() => {
                setResponseMessage("");
                clearTimeout(timer);
            }, 3000);
        })
    }

    return <S.Content>
        <S.LeftColumn>
            <FormContainer>
                <Input type="number" placeholder="Enter the measure" onChange={(e) => setMeasure(e.target.value)} />
                <Button onClick={handleSubmit}>SUBMIT</Button>
                <S.FeedBack>{responseMessage}</S.FeedBack>
            </FormContainer>
        </S.LeftColumn>
        <S.RightColumn>
            <MetricsTable points={data} />
            <Button onClick={handleClickGroup}>{groupData ? 'RAW DATA' : 'GROUP BY DATE'}</Button>
        </S.RightColumn>
    </S.Content>    
}

export { Content }