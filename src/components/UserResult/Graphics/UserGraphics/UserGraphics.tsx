import React from 'react';
import { observer, inject } from 'mobx-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts';

import styles from '@src/components/UserResult/Graphics/UserGraphics/UserGraphics.scss';
import DataInputStore from '@src/modules/DataInputStore/DataInputStore';
import { computed } from 'mobx';

type Props = {
    dataInputStore?: DataInputStore
};


@inject('dataInputStore')

@observer
class UserGraphics extends React.Component<Props>{

    @computed
    get store(){
        return this.props.dataInputStore!;
    }

    result: any[] = this.logics(this.store.movies, this.store.taxi, this.store.fastFood, this.store.museum, this.store.wardrobe, this.store.unexpectedExpenses, this.store.moviesPriority, this.store.taxiPriority, this.store.fastFoodPriority, this.store.museumPriority, this.store.wardrobePriority, this.store.unexpectedExpensesPriority, this.store.desiredAmount);

    @computed
    get data () {
        
          return [
              { name: 'кино', Your_Expenses: Number(this.store.movies), Desired_Expenses: Math.ceil(Number(this.store.movies)-Number(this.result[0]))},
              { name: 'такси', Your_Expenses: Number(this.store.taxi), Desired_Expenses: Math.ceil(Number(this.store.taxi)- Number(this.result[1]))},
              { name: 'fastfood', Your_Expenses: Number(this.store.fastFood), Desired_Expenses: Math.ceil(Number(this.store.fastFood)-Number(this.result[2]))},
              { name: 'музеи', Your_Expenses: Number(this.store.museum), Desired_Expenses:  Math.ceil(Number(this.store.museum)-Number(this.result[3]))},
              { name: 'гардероб', Your_Expenses: Number(this.store.wardrobe), Desired_Expenses:  Math.ceil(Number(this.store.wardrobe)-Number(this.result[4]))},
              { name: 'непредвиденные расходы', Your_Expenses: Number(this.store.unexpectedExpenses), Desired_Expenses:  Math.ceil(Number(this.store.unexpectedExpenses)-Number(this.result[5]))},
              {name: 'экономия', Desire_Amount: Number(this.store.desiredAmount), Managed_To_Save: Math.ceil(Number(this.result[0]))+Math.ceil(Number(this.result[1]))+Math.ceil(Number(this.result[2]))+Math.ceil(Number(this.result[3]))+Math.ceil(Number(this.result[4]))+Math.ceil(Number(this.result[5]))},
          ];
      }
  

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.cardTitle}>ваши результаты</div>
                </div>
                <div className={styles.graphics}>
                    <BarChart 
                        width={488} 
                        height={350} 
                        data={this.data}
                        margin={{top: 0, right: 30, left: 0, bottom: 5}}> 
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="Desire_Amount" fill="#b99b39" />
                        <Bar dataKey="Your_Expenses" fill="#7a9abc"/>
                        <Bar dataKey="Desired_Expenses" fill="#267c5e" />
                        <Bar dataKey="Managed_To_Save" fill="#b93939" />
                    </BarChart>
                </div>
                <div className={styles.report}>
                    <div className={styles.dataBefore}>
                        <div>кино: {Number(this.store.movies)} руб.</div>
                        <div>такси: {Number(this.store.taxi)} руб.</div>
                        <div>fastFood: {Number(this.store.fastFood)} руб.</div>
                        <div>музеи: { Number(this.store.museum)} руб.</div> 
                        <div>гардероб: { Number(this.store.wardrobe)} руб.</div> 
                        <div>непредвиденные расходы: { Number(this.store.unexpectedExpenses)} руб.</div> 
                    </div>
                    <div className={styles.dataAfter}>
                        <div>снизим расходы на : {Math.ceil(Number(this.result[0]))} руб.</div>
                        <div>снизим расходы на : {Math.ceil(Number(this.result[1]))} руб.</div>
                        <div>снизим расходы на : {Math.ceil(Number(this.result[2]))} руб.</div>
                        <div>снизим расходы на : {Math.ceil(Number(this.result[3]))} руб.</div> 
                        <div>снизим расходы на : {Math.ceil(Number(this.result[4]))} руб.</div>
                        <div>снизим расходы на : {Math.ceil(Number(this.result[5]))} руб.</div>     
                    </div>
                </div>
            </div>
        );

    }

    gauss(matr: any[][], bcol: any[], size: number ): any[] {
        // console.log(matr[1][1]);

        const eps: any = 0.00001;
        let kindex: any = 0;
        let index: any;
        let max: any;
        const result: number[] = [];
        while(kindex < size) {
            max = Math.abs(matr[kindex][kindex]);
            index = kindex;
            for(let i = kindex + 1; i < size; i++){
                if(Math.abs(matr[i][kindex]) > max) {
                    max = Math.abs(matr[i][kindex]);
                    index = i;
                }
            }
            for(let j = 0; j< size; j++){
                let temp: any = matr[kindex][j];
                matr[kindex][j] = matr[index][j];
                matr[index][j] = temp;
            }
            let temp1: any = bcol[kindex];
            bcol[kindex] = bcol[index];
            bcol[index] = temp1;

            for(let i = kindex; i < size; i++) {
                let temp2: any = matr[i][kindex];
                if(Math.abs(temp2) < eps) {
                    continue;
                }
                for (let j = 0; j < size; j++){
                    matr[i][j] = matr[i][j] / temp2;
                }
                bcol[i] = bcol[i] / temp2;
                if (i === kindex) {
                     continue;
                 }
                for (let j = 0; j < size; j++) {
                    matr[i][j] = matr[i][j] - matr[kindex][j];
                }
                bcol[i] = bcol[i] - bcol[kindex];
            }
            kindex++;
        }
        for (kindex = size - 1; kindex >= 0; kindex--)
        {   
            result[kindex] = bcol[kindex];
            for (let i = 0; i < kindex; i++){
                bcol[i] = bcol[i] - matr[i][kindex] * result[kindex];
            }
        }   
        return result;
    }

    compareNumeric(a: any, b: any) {
        if (a > b) {
            return 1;
        }
        else {
            return -1;
        }
    }

    logics(moovie: any, taxi: any, fastFood: any, museum: any, wardrobe:any, unexpectedExpenses: any, movp: any, taxp: any, ffp: any, musp: any, warp: any, uEp: any, desiredAmount: any): any[]{

        let x1: any = moovie * movp;
        let x2: any = taxi * taxp;
        let x3: any = fastFood * ffp;
        let x4: any = museum * musp;
        let x5: any = wardrobe * warp;
        let x6: any = unexpectedExpenses * uEp;


        let resultarr: any[] = [];

        let arr: any = [x1, x2, x3, x4, x5, x6];

        arr.sort(this.compareNumeric);

        let b:any = [0, 0, 0, 0, 0, 0, -desiredAmount];

        let matrix: number[][] = Array(7).fill([]);
        // console.log(matrix);
        matrix[0] = [0,0,0,0,0,0,-1];
        matrix[1] = [0,0,0,0,0,0,-1];
        matrix[2] = [0,0,0,0,0,0,-1];
        matrix[3] = [0,0,0,0,0,0,-1];
        matrix[4] = [0,0,0,0,0,0,-1];
        matrix[5] = [0,0,0,0,0,0,-1];
        matrix[6] = [-1,-1,-1,-1,-1,-1,0];
        

        if(+movp === 2){
            matrix[0][0] = arr[0];
        }
        if(+movp === 3){
            matrix[0][0] = arr[1];
        }
        if(+movp === 4){
            matrix[0][0] = arr[2];
        }
        if(+movp === 5){
            matrix[0][0] = arr[3];
        }
        if(+movp === 6){
            matrix[0][0] = arr[4];
        }
        if(+movp === 7){
            matrix[0][0] = arr[5];
        }

        if(+taxp === 2){
            matrix[1][1] = arr[0];
        }
        if(+taxp === 3){
            matrix[1][1] = arr[1];
        }
        if(+taxp === 4){
            matrix[1][1] = arr[2];
        }
        if(+taxp === 5){
            matrix[1][1] = arr[3];
        }
        if(+taxp === 6){
            matrix[1][1] = arr[4];
        }
        if(+taxp === 7){
            matrix[1][1] = arr[5];
        }

        if(+ffp === 2){
            matrix[2][2] = arr[0];
        }
        if(+ffp === 3){
            matrix[2][2] = arr[1];
        }
        if(+ffp === 4){
            matrix[2][2] = arr[2];
        }
        if(+ffp === 5){
            matrix[2][2] = arr[3];
        }
        if(+ffp === 6){
            matrix[2][2] = arr[4];
        }
        if(+ffp === 7){
            matrix[2][2] = arr[5];
        }
        
        if(+musp === 2){
            matrix[3][3] = arr[0];
        }
        if(+musp  === 3){
            matrix[3][3] = arr[1];
        }
        if(+musp  === 4){
            matrix[3][3] = arr[2];
        }
        if(+musp  === 5){
            matrix[3][3] = arr[3];
        }
        if(+musp  === 6){
            matrix[3][3] = arr[4];
        }
        if(+musp  === 7){
            matrix[3][3] = arr[5];
        }

        if(+warp === 2){
            matrix[4][4] = arr[0];
        }
        if(+warp  === 3){
            matrix[4][4]  = arr[1];
        }
        if(+warp  === 4){
            matrix[4][4]  = arr[2];
        }
        if(+warp  === 5){
            matrix[4][4]  = arr[3];
        }
        if(+warp  === 6){
            matrix[4][4]  = arr[4];
        }
        if(+warp  === 7){
            matrix[4][4]  = arr[5];
        }

        if(+uEp === 2){
            matrix[5][5] =  arr[0];
        }
        if(+uEp  === 3){
            matrix[5][5]  = arr[1];
        }
        if(+uEp  === 4){
            matrix[5][5]  = arr[2];
        }
        if(+uEp  === 5){
            matrix[5][5]  = arr[3];
        }
        if(+uEp  === 6){
            matrix[5][5]  = arr[4];
        }
        if(+uEp  === 7){
            matrix[5][5]  = arr[5];
        }



        resultarr = this.gauss(matrix, b, 7);
        // console.log(matrix);
        return resultarr;
    }

}

export default UserGraphics;
    