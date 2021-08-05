import * as React from 'react';
import { ButtonProps, Button } from '@chakra-ui/react';
import { ApiStatistikk, getStatistikk } from '../../../services/statistikk/StatistikkService';

export const DownloadStatisticsButton: React.FC<ButtonProps> = ({ ...props }) => {
    const downloadStatistics = () => {
        const data = getStatistikk();
        data.then((result) => constructJsonFile(result));
    };

    const constructJsonFile = (data: Array<ApiStatistikk>) => {
        //From: https://stackoverflow.com/questions/51215642/converting-object-into-json-and-downloading-as-a-json-file-in-react
        const filename = 'vektstatistikk.json';
        const contentType = 'application/json;charset=utf-8;';
        if (window.navigator && navigator.msSaveBlob) {
            const blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data, null, 2)))], {
                type: contentType,
            });
            navigator.msSaveBlob(blob, filename);
        } else {
            const a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data, null, 2));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <Button
            paddingX={8}
            paddingY={6}
            variant="outline"
            fontSize="1rem"
            fontWeight={400}
            aria-label="Last ned vektstatistikk"
            {...props}
            onClick={() => downloadStatistics()}
        >
            Last ned vektstatistikk
        </Button>
    );
};
