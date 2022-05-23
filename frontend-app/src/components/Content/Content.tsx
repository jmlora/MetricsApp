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
    const [measure, setMeasure] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [data, setData] = useState<IPoint[]>([]);
    const [groupData, setGroupData] = useState('');

    const GROUP_BY_MIN = 'min';
    const GROUP_BY_HOUR = 'hour';
    const GROUP_BY_DAY = 'day';

    const url = 'http://localhost/metrics';

    useEffect(() => {
        getFetch<IPoint[]>(url)
            .then((resp) => setData(resp))
    }, []);

    useEffect(() => {
        getFetch<IPoint[]>(groupData.length > 0 ? `${url}?groupBy=${groupData}` : url)
        .then((resp) => setData(resp))

    }, [groupData]);

    const handleClickRawData = () => {
        setGroupData('');
    }

    const handleClickGroupByMin = () => {
        setGroupData(GROUP_BY_MIN);
    }

    const handleClickGroupByHour = () => {
        setGroupData(GROUP_BY_HOUR);
    }

    const handleClickGroupByDay = () => {
        setGroupData(GROUP_BY_DAY);
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
            <S.ButtonColumn>
                <Button onClick={handleClickRawData}>RAW DATA</Button>
                <Button onClick={handleClickGroupByMin}>GROUP BY MIN</Button>
                <Button onClick={handleClickGroupByHour}>GROUP BY HOUR</Button>
                <Button onClick={handleClickGroupByDay}>GROUP BY DATE</Button>
            </S.ButtonColumn>
        </S.RightColumn>
    </S.Content>    
}

export { Content }