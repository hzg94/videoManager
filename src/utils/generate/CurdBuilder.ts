import {TableFormGen} from "@/utils/generate/TableFormGen";
import {ColumnsBuilder} from "@/utils/generate/ColumnsBuilder";

export class CrudBuild<T> {

    private columnsBuild: ColumnsBuilder<T>;
    private formColumnsBuilder: TableFormGen<T> | null = null;
    /**
     * 用于存储页面上下文 提供Builder使用
     * @private
     */
    private context: Record<string, any> = {};

    constructor(columnsBuild: ColumnsBuilder<T>,) {
        this.columnsBuild = columnsBuild;
    }


    static build<T>(data: T, config?: any): CrudBuild<T> {

        const columnsBuilder = ColumnsBuilder.parse<T>(data);

        return new CrudBuild<T>(columnsBuilder)
    }

    getTable() {
        return {
            CurdInstance: this,
            columns: this.columnsBuild.get(),
            form: this.formColumnsBuilder?.get() ?? [],
        };
    }

    /**
     * 添加上下文
     * @param name
     * @param contextValue
     */
    addContext(name: string, contextValue: any) {
        this.context[name] = contextValue;
    }

    configFormColumnsBuilder(columnsFormBuildConfigFunction: columnsFormBuildConfigFunctionType<T>): CrudBuild<T> {
        this.formColumnsBuilder = columnsFormBuildConfigFunction(this.columnsBuild,this.context);
        return this
    }

    configColumnsBuilder(columnsBuildConfigFunction: columnsBuildConfigFunctionType<T>): CrudBuild<T> {
        this.columnsBuild = columnsBuildConfigFunction(this.columnsBuild,this.context);
        return this
    }
}


type columnsFormBuildConfigFunctionType<T> = (builder: ColumnsBuilder<T>,context: Record<string, any>) => TableFormGen<T>

type columnsBuildConfigFunctionType<T> = (builder: ColumnsBuilder<T>,context: Record<string, any>) => ColumnsBuilder<T>
