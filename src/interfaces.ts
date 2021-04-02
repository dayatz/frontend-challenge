import { Moment } from "moment";

export enum RoadType {
    City,
    Rural,
    Residential,
    Bikepath
}

export interface Point {
    lat: number;
    lng: number;
}

export interface PointObject {
    ClassName: string;
    Reviewed: boolean;
    Verified: boolean;
    DetectedAt: number;
    CaptureId: string;
    RouteId: string;
    DamagePoint: number;
    Roadtype: RoadType;
    Point: Point;
}

export type Filter = {
    dateStart: Moment | null,
    dateEnd: Moment | null,
    roadTypes: RoadType[],
}


export type DamageDistributionClassnames = {
    level1: number
    level2: number
    level3: number
    level4: number
    level5: number
    total: number
}
