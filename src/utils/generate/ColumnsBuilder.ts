import type {ProColumns} from "@ant-design/pro-components/lib";


type ObjectKey<T> = keyof T

type FieldRecord<T> = {
    [P in ObjectKey<T>]?: string;
};

export class ColumnsBuilder<T> {

    columns: ProColumns<T>[]

    constructor(data: Array<any>) {
        this.columns = data;
    }

    static parse<T>(data: T | Array<any>): ColumnsBuilder<T> {
        if (!data) {
            return new ColumnsBuilder([]);
        }

        let dataColumns: ProColumns<T>[] = []

        Object.keys(data).forEach(key => {
            dataColumns.push({
                title: key,
                dataIndex: key,
                key: key,
            })
        })

        return new ColumnsBuilder(dataColumns)
    }

    /**
     * 忘记掉这个方法 没有使用意义
     * @deprecated
     * @param data
     */
    static parseArray<T>(data: Array<any>): ColumnsBuilder<T> {
        let dataColumns: ProColumns<T>[] = []

        Object.keys(data.at(0)).forEach(key => {
            dataColumns.push({
                title: key,
                dataIndex: key,
                key: key
            })
        })

        return new ColumnsBuilder(dataColumns)
    }


    private findFieldForKey(fieldName: ObjectKey<T>) {
        let index = -1;
        for (let i = this.columns.length - 1; i >= 0; i--) {
            if (fieldName === this.columns[i].key) {
                return i
            }
        }
        return index
    }

    /**
     * 设置字段
     * @param fieldKey
     * @param data
     */
    setFieldType(fieldKey: ObjectKey<T>, data: ProColumns<T>) {

        let index = this.findFieldForKey(fieldKey)

        if (index === -1) {
            console.warn(`Cannot set field type ${String(fieldKey)}, Because no find field`)
            return this
        }

        this.columns[index] = {
            ...this.columns[index],
            ...data
        }

        return this
    }

    /**
     * 设置字段的渲染函数
     * @param fieldKey
     * @param render
     */
    updateRender(fieldKey: ObjectKey<T>, render: ProColumns<T>['render']){
        let index = this.findFieldForKey(fieldKey)

        if (index === -1) {
            console.warn(`Cannot set field render ${String(fieldKey)}, Because no find field`)
            return this
        }

        this.columns[index].render = render

        return this
    }

    /**
     * 设置字段的文本渲染
     * @param fieldKey
     * @param renderText
     */
    updateRenderText(fieldKey: ObjectKey<T>, renderText: ProColumns<T>['renderText']){
        let index = this.findFieldForKey(fieldKey)

        if (index === -1) {
            console.warn(`Cannot set field render ${String(fieldKey)}, Because no find field`)
            return this
        }

        this.columns[index].renderText = renderText

        return this
    }

    /**
     * 设置字段的标题
     * @param titleMap
     */
    titleMap(titleMap: FieldRecord<T>) {
        for (let titleMapKey in titleMap) {
            const value = titleMap[titleMapKey]

            this.setFieldType(titleMapKey, {
                title: value
            })
        }
        return this
    }

    /**
     * 设置排序字段
     *
     * 此方法用于为表格列设置排序功能它接受一个对象键的数组作为参数，
     * 并为数组中的每个键对应的列启用排序功能如果某个键对应的列不存在，
     * 则会发出警告并终止执行
     *
     * @param fieldKeys - 一个对象键的数组，表示需要设置排序功能的列的键
     * @returns 返回当前对象实例，支持链式调用
     */
    setSortField(fieldKeys: Array<ObjectKey<T>>){
        for (let i = fieldKeys.length - 1; i >= 0; i--) {
            let index = this.findFieldForKey(fieldKeys[i])

            if (index === -1) {
                console.warn(`Cannot set field render ${String(fieldKeys[i])}, Because no find field`)
                return this
            }

            this.columns[index]['sorter'] = true
        }

        return this
    }

    /**
     * 设置隐藏搜索字段
     * 此方法遍历预定义的字段键，以逆序查找并设置这些字段的排序属性为true
     * 如果未找到指定的字段，则发出警告并终止执行
     * @param fieldKeys - 一个对象键的数组，表示需要设置隐藏搜索功能的列的键
     * @returns {this} 返回当前对象实例，支持链式调用
     */
    setHideSearchField(fieldKeys: Array<ObjectKey<T>>){
        for (let i = fieldKeys.length - 1; i >= 0; i--) {
            let index = this.findFieldForKey(fieldKeys[i])

            if (index === -1) {
                console.warn(`Cannot set field render ${String(fieldKeys[i])}, Because no find field`)
                return this
            }

            this.columns[index]['hideInSearch'] = true
        }

        return this
    }


    /**
     * 设置枚举字段
     * @param fieldKey
     * @param valueEnum
     */
    setEnumField(fieldKey: ObjectKey<T>, valueEnum: ProColumns['valueEnum']){
        let index = this.findFieldForKey(fieldKey)

        if (index === -1) {
            console.warn(`Cannot set field render ${String(fieldKey)}, Because no find field`)
            return this
        }

        this.columns[index]['valueType'] = 'select'
        this.columns[index]['valueEnum'] = valueEnum

        return this
    }

    /**
     * 设置隐藏字段
     * @param fieldNames
     */
    setHidden(fieldNames: Array<ObjectKey<T>>) {
        for (let i = 0; i < fieldNames.length; i++) {
            let index = this.findFieldForKey(fieldNames[i])

            if (index === -1) {
                continue
            }

            this.setFieldType(fieldNames[i], {
                hidden: true,
            })
        }

        return this
    }

    /**
     * 向当前对象的列集合中添加一个新的列字段
     * @param field {ProColumns} 要添加的列字段配置对象
     * @returns {this} 返回当前对象实例，支持链式调用
     */
    addField(field: ProColumns<T>) {
        this.columns.push(field)
        return this
    }

    /**
     * 向当前对象的列集合中添加一个操作列字段
     * @param title {string} 操作列标题
     * @param render {ProColumns['render']} 操作列渲染函数
     * @returns {this} 返回当前对象实例，支持链式调用
     */
    addAction(title: string, render: ProColumns<T>['render']) {
        return this.addField({
            title: title,
            valueType: 'option',
            key: 'option',
            render: render,
        })
    }

    get() {
        return this.columns
    }
}
