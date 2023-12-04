import axios from 'axios';
import { dateHandler } from '../utils';
import { logger } from '../../../lib/logger';
import { PRODUCTS } from '../../../constants';

const tchapAdaptator = { fetch };

const productName = PRODUCTS.TCHAP.name;

type tchapApiOutputType = Array<{
    Month: string;
    'Valeurs distinctes de User ID': number;
}>;

async function fetch() {
    const url =
        'https://stats.tchap.incubateur.net/public/question/beec667e-3471-4598-bd48-d119128ff7b7.json';
    const result = await axios.get<tchapApiOutputType>(url);
    const tchapOutputRows = result.data;

    const indicatorName = 'utilisateurs actifs';
    const indicatorDtos: any = [];
    for (const tchapOutputRow of tchapOutputRows) {
        try {
            const date_debut = dateHandler.formatDate(tchapOutputRow.Month);
            const date = dateHandler.addMonth(date_debut);
            const value = Number(tchapOutputRow['Valeurs distinctes de User ID']);
            if (isNaN(value)) {
                throw new Error(
                    `tchapOutputRow['Valeurs distinctes de User ID'] ${tchapOutputRow['Valeurs distinctes de User ID']} is NaN`,
                );
            }
            indicatorDtos.push({
                date_debut,
                date,
                indicateur: indicatorName,
                unite_mesure: 'unité',
                nom_service_public_numerique: productName,
                frequence_monitoring: 'mensuelle',
                est_automatise: true,
                est_periode: true,
                valeur: value,
            });
        } catch (error) {
            logger.error({
                productName,
                indicator: indicatorName,
                message: error as string,
            });
        }
    }

    return indicatorDtos;
}

export { tchapAdaptator };
