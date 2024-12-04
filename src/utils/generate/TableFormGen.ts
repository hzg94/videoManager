import type {ProFormColumnsType} from "@ant-design/pro-components/lib";
import type {Rule} from "rc-field-form/lib/interface";
import type {FormItemProps} from "antd/lib/form";

import StringUtils from "@/utils/type/StringUtils";
import FunctionUtils from "@/utils/type/FunctionUtils";
import {ColumnsBuilder} from "@/utils/generate/ColumnsBuilder";

type ObjectKey<T> = keyof T

type FieldRecord<T,V> = {
    [P in ObjectKey<T> ] ?: V;
};

export class TableFormGen<T> {

    fromColumns: ProFormColumnsType<T, any>[]

    constructor(fromColumns: ProFormColumnsType[]) {
        this.fromColumns = fromColumns;
    }

    private static parseColumns<T>(columns: ColumnsBuilder<T>): ProFormColumnsType<T, any>[] {
        const column = columns.get();
        let res: ProFormColumnsType<T>[] = []

        for (let i = 0; i < column.length; i++) {
            if (StringUtils.isString(column[i].title)) {
                //skip action
                if (column[i].key === "option") {
                    continue
                }

                res.push({
                    title: column[i].title as string,
                    key: column[i].key as string,
                    dataIndex: column[i].dataIndex,
                    formItemProps: {
                        rules: []
                    },

                    valueType: column[i].valueType,
                    valueEnum: column[i].valueEnum
                })
            } else {
                console.warn(`parse no support column ${column[i].title} is ReactNode`)
            }
        }

        return res
    }

    static build<T>(builder: ColumnsBuilder<T>): TableFormGen<T> {
        return new TableFormGen<T>(this.parseColumns<T>(builder))
    }

    // 工具方法

    private findFieldForKey(fieldName: ObjectKey<T>) {
        let index = -1;
        for (let i = this.fromColumns.length - 1; i >= 0; i--) {
            if (fieldName === this.fromColumns[i].key) {
                return i
            }
        }
        return index
    }

    setHidden(fieldName: Array<ObjectKey<T>>) {
        for (let i = 0; i < fieldName.length; i++) {
            let fieldIndex = this.findFieldForKey(fieldName[i]);
            this.fromColumns.splice(fieldIndex, 1)
        }
        return this
    }

    setFieldValueType(fieldObjectKey: ObjectKey<T>, valueType: ProFormColumnsType['valueType']){
        let index = this.findFieldForKey(fieldObjectKey)

        if (index === -1) {
            console.warn(`Cannot set from field ${String(fieldObjectKey)}, Because no find field`)
            return this
        }

        this.fromColumns[index]['valueType'] = valueType

        return this
    }

    /**
     * 添加表单字段 自定义列表
     * TODO: 暂时不支持 <h1 style="color:red">未完成</h1>
     * @param title
     */
    addFieldList(title: string ){
        this.fromColumns.push({
            title: '快递单号',
            valueType: 'formList',
            dataIndex: 'list',
            columns: [
                {
                    valueType: 'group',
                    columns: [

                    ]
                }
            ]
        })

        return this
    }

    setInitialValues(fieldObject: FieldRecord<T,string>) {
        for (let fieldObjectKey in fieldObject) {
            this.setFromField(fieldObjectKey, {
                initialValue: fieldObject[fieldObjectKey]
            });
        }
        return this
    }

    addRule(fieldObject: FieldRecord<T, Rule>){
        for (let fieldObjectKey in fieldObject) {
            let index = this.findFieldForKey(fieldObjectKey)

            if (index === -1) {
                console.warn(`Cannot set from field ${fieldObjectKey}, Because no find field`)
                return this
            }

            if (!FunctionUtils.isFunction(this.fromColumns[index]['formItemProps'])) {
                let item = this.fromColumns[index]['formItemProps'] as FormItemProps<T>

                if(item.rules){
                    let fieldObjectElement = fieldObject[fieldObjectKey];
                    if(fieldObjectElement){
                        item.rules.push(fieldObjectElement)
                    }
                }else{
                    console.warn(`field ${fieldObjectKey} rule array no init`)
                }
            }
        }
        return this
    }

    setRequiredRule(fieldObject: FieldRecord<T, any>) {

        let RequireRules:FieldRecord<T, Rule> = {}

        for (let fieldObjectKey in fieldObject) {
            RequireRules[fieldObjectKey] = {
                required: true,
                message: fieldObject[fieldObjectKey]
            }
        }

        this.addRule(RequireRules)

        return this
    }

    setFromItemProps(fieldKey: ObjectKey<T>, fromItemProps: ProFormColumnsType<T>['formItemProps']) {
        let index = this.findFieldForKey(fieldKey)

        if (index === -1) {
            console.warn(`Cannot set from field ${String(fieldKey)}, Because no find field`)
            return this
        }

        if (FunctionUtils.isFunction(this.fromColumns[index]['formItemProps'])) {
            console.info(`FormItemProps ${String(fieldKey)} is function`)
            this.fromColumns[index]['formItemProps'] = fromItemProps
        } else {
            this.fromColumns[index]['formItemProps'] = {
                ...this.fromColumns[index]['formItemProps'],
                ...fromItemProps
            }
        }

        return this
    }

    //
    setFromField(fieldKey: ObjectKey<T>, data: ProFormColumnsType<T>) {

        let index = this.findFieldForKey(fieldKey)

        if (index === -1) {
            console.warn(`Cannot set from field ${String(fieldKey)}, Because no find field`)
            return this
        }

        this.fromColumns[index] = {
            ...this.fromColumns[index],
            ...data
        }

        return this
    }


    get(): ProFormColumnsType<T, "text">[] {
        return this.fromColumns;
    }


}