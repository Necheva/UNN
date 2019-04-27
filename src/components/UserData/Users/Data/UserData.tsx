import React from 'react';
import { observer, inject } from 'mobx-react';

import styles from '@src/components/UserData/Users/Data/UserData.scss';
import Input from '@src/components/common/Input/Input';
import InputLayout from '@src/components/common/InputLayout/InputLayout';
import DataInputStore from '@src/modules/DataInputStore/DataInputStore';


type Props = {
    dataInputStore?: DataInputStore
};


@inject('dataInputStore')

@observer
class UserData extends React.Component<Props> {

    get dataInputStore(){
        return this.props.dataInputStore!;
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.cardTitle}>ваши расходы</div>
                </div>
                <div className={styles.input}>
                    <div className={styles.thing}>
                        <InputLayout title={'посещение кинотеатра'} className={styles.boxmargin} >
                            <Input
                                autoFocus
                                placeholder={'введите расходы на кино.'}
                                spellCheck={false}
                                value = {this.dataInputStore.movies}
                                onValueChanged={value => {
                                    this.dataInputStore.movies = value;                        
                                }}
                            />
                        </InputLayout>
                        <InputLayout title={'такси'} className={styles.boxmargin} >
                            <Input
                                autoFocus
                                placeholder={'введите расходы на такси.'}
                                spellCheck={false}
                                value = {this.dataInputStore.taxi}
                                onValueChanged={value => {
                                    this.dataInputStore.taxi = value;                        
                                }}
                            />
                        </InputLayout>
                        <InputLayout title={'fast food'} className={styles.boxmargin} >
                            <Input
                                autoFocus
                                placeholder={'введите расходы на fast food.'}
                                spellCheck={false}
                                value = {this.dataInputStore.fastFood}
                                onValueChanged={value => {
                                    this.dataInputStore.fastFood = value;                        
                                }}
                            />
                        </InputLayout>
                        <InputLayout title={'музеи'} className={styles.boxmargin} >
                            <Input
                                autoFocus
                                placeholder={'введите расходы на музеи.'}
                                spellCheck={false}
                                value = {this.dataInputStore.museum}
                                onValueChanged={value => {
                                    this.dataInputStore.museum = value;                        
                                }}
                            />
                        </InputLayout>
                        <InputLayout title={'гардероб'} className={styles.boxmargin} >
                            <Input
                                autoFocus
                                placeholder={'введите расходы на обновление гардероба.'}
                                spellCheck={false}
                                value = {this.dataInputStore.wardrobe}
                                onValueChanged={value => {
                                    this.dataInputStore.wardrobe = value;                        
                                }}
                            />
                        </InputLayout>
                        <InputLayout title={'непредвиденные расходы'} className={styles.boxmargin} >
                            <Input
                                autoFocus
                                placeholder={'введите предполагаемую сумму.'}
                                spellCheck={false}
                                value = {this.dataInputStore.unexpectedExpenses}
                                onValueChanged={value => {
                                    this.dataInputStore.unexpectedExpenses = value;                        
                                }}
                            />
                        </InputLayout>
                        <InputLayout title={'экономия'} className={styles.boxmargin} >
                                    <Input
                                        autoFocus
                                        placeholder={'введите сумму, которую хотите экономить.'}
                                        spellCheck={false}
                                        value = {this.dataInputStore.desiredAmount}
                                        onValueChanged={value => {
                                            this.dataInputStore.desiredAmount = value;                        
                                        }}
                                    />
                        </InputLayout>
                    </div>
                    <div className={styles.priority}>
                        <InputLayout title={'приоритет (2-7)'} className={styles.boxmargin} >
                            <Input
                                autoFocus
                                placeholder={'приоритет кино.'}
                                spellCheck={false}
                                value = {this.dataInputStore.moviesPriority}
                                onValueChanged={value => {
                                    this.dataInputStore.moviesPriority = value;                        
                                }}
                            />
                        </InputLayout>
                        <InputLayout title={'приоритет (2-7)'} className={styles.boxmargin} >
                                <Input
                                    autoFocus
                                    placeholder={'приоритет такси.'}
                                    spellCheck={false}
                                    value = {this.dataInputStore.taxiPriority}
                                    onValueChanged={value => {
                                        this.dataInputStore.taxiPriority = value;                        
                                    }}
                                />
                        </InputLayout>
                        <InputLayout title={'приоритет (2-7)'} className={styles.boxmargin} >
                                <Input
                                    autoFocus
                                    placeholder={'приоритет fast food.'}
                                    spellCheck={false}
                                    value = {this.dataInputStore.fastFoodPriority}
                                    onValueChanged={value => {
                                        this.dataInputStore.fastFoodPriority = value;                        
                                    }}
                                />
                        </InputLayout>
                        <InputLayout title={'приоритет (2-7)'} className={styles.boxmargin} >
                                    <Input
                                        autoFocus
                                        placeholder={'приоритет музеев.'}
                                        spellCheck={false}
                                        value = {this.dataInputStore.museumPriority}
                                        onValueChanged={value => {
                                            this.dataInputStore.museumPriority = value;                        
                                        }}
                                    />
                        </InputLayout>
                        <InputLayout title={'приоритет (2-7)'} className={styles.boxmargin} >
                                    <Input
                                        autoFocus
                                        placeholder={'приоритет гардероба.'}
                                        spellCheck={false}
                                        value = {this.dataInputStore.wardrobePriority}
                                        onValueChanged={value => {
                                            this.dataInputStore.wardrobePriority = value;                        
                                        }}
                                    />
                        </InputLayout>
                        <InputLayout title={'приоритет (2-7)'} className={styles.boxmargin} >
                                    <Input
                                        autoFocus
                                        placeholder={'расходы.'}
                                        spellCheck={false}
                                        value = {this.dataInputStore.unexpectedExpensesPriority}
                                        onValueChanged={value => {
                                            this.dataInputStore.unexpectedExpensesPriority = value;                        
                                        }}
                                    />
                        </InputLayout>
                    </div>
                </div>
            </div>
        
        );
    }
}
export default UserData;
