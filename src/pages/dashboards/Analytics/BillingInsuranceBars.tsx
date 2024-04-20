import React from 'react';
import DoughnutChart from './DoughnutChart';
import { IInsurance } from '../../../constants/types';
import { Translate } from 'react-localize-redux';
import Loader from '../../../components/Loader';
import { useQuery } from '@tanstack/react-query';
import { useInsurances } from '../../../hooks';
import { useTheme } from '@mui/styles';

interface BillingInsuranceBarsProps {
    startDate: number,
    endDate: number,
    uuidInvestigation: string,
    currency: string,
    locale: string    
}

export const BillingInsuranceBars: React.FC<BillingInsuranceBarsProps> = ({ startDate, endDate, uuidInvestigation,
                                                                                locale, currency }) => {
    const [insurances, loadingInsurances] = useInsurances();
    const url = import.meta.env.VITE_APP_API_URL + "/analytics/" + uuidInvestigation + "/billing/insurances/startDate/" + startDate + "/endDate/" + endDate;
    const { isPending, error, data } = useQuery({
        queryKey: ["BillingInsuranceBars", startDate, endDate, uuidInvestigation],
        queryFn: () =>
          fetch(url, {
            headers : {
                "Authorization": localStorage.getItem("jwt") || ""
            }
        })
        .then((res) =>
            res.json(),
        ),
        staleTime: Infinity,
    });
    if(isPending || loadingInsurances){
        return <Loader />;
    }
    if(error){
        return <div>Error: {error.message}</div>;
    }
    return <BillingInsuranceBarsView
                locale={locale}
                insurances={insurances} currency={currency}
                stats={data.stats} />;
}

interface BillingInsuranceBarsViewProps extends Omit<BillingInsuranceBarsProps, "uuidInvestigation" | "startDate" | "endDate"> {
    insurances: IInsurance[],
    stats: { [insuranceCode: string]: number },
}

export const BillingInsuranceBarsView: React.FC<BillingInsuranceBarsViewProps> = ({ locale, stats, insurances, currency }) => {
    const theme = useTheme();
    const labels = Object.keys(stats).map((code) => insurances.find((insurance) => insurance.code === code)?.name);
    const totalBilling = Object.values(stats).reduce((a, b) => a + b, 0);
    const percentsInsurance = Object.keys(stats).map((key) => ((totalBilling > 0 ? stats[key] / totalBilling : 0) * 100).toFixed(2));
    const amountTitle = [<Translate id="hospital.analytics.graphs.billing-insurances.amount" />, "("+currency+")"]
    const billinPerInsurance = Object.keys(stats).map((key) => stats[key]);

    return (
        <>
            <DoughnutChart title={<Translate id="hospital.analytics.graphs.billing-insurances.title" />} 
                labels={labels}
                table={{ 
                    title: <Translate id="hospital.analytics.graphs.billing-insurances.title" />, 
                    columns: [amountTitle] 
                }}
                innerInfo={{ 
                    title: <Translate id="hospital.analytics.graphs.billing-insurances.title" />, 
                    value: new Intl.NumberFormat(locale).format(totalBilling) 
                }}
                datasets={[
                    {
                        data: billinPerInsurance,
                        percents: percentsInsurance,
                        backgroundColor: [ "#ef6657", "#f4b400", "#00a3e0", "#f47835", "#7f7f7f"],
                        borderWidth: 5,
                        borderColor: theme.palette.background.paper,
                    }
                ]} />
        </>
    );
};
