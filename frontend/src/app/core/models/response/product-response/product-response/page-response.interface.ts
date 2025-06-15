import { Page } from "./Page.interface";

export interface PageResponse<T> {
    content: T[];
    page: Page;
}
