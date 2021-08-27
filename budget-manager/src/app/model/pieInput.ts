export interface IPieInput {
    value: number;
    name: string;
};

export interface IGraphInput {
    name: string;
    series: IGraphSeries[]
};

export interface IGraphSeries {
    name: string;
    value: number;
    tooltipText: string;
}