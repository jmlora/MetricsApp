import React from 'react';
import * as S from './MetricsTable.styles';
import { IPoint } from '../../Interfaces/IPoint';

function MetricsTable({
    points
}: { points: IPoint[]}) {
    return <S.MetricsTable>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {points.map(point =>
                        <tr>
                            <td>{point.time}</td>
                            <td>{point.value}</td>
                        </tr>
                    )
                }
            </tbody>
        </S.MetricsTable>
}

export { MetricsTable }