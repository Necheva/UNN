import {observable } from 'mobx';

class DataInputSore{
    @observable
    movies: any;

    @observable
    taxi: any;

    @observable
    fastFood: any;

    @observable
    museum: any;

    @observable
    moviesPriority: any;

    @observable
    taxiPriority: any;

    @observable
    fastFoodPriority: any;

    @observable
    museumPriority: any;

    @observable
    desiredAmount: any;

    @observable
    wardrobe: any;
    
    @observable
    unexpectedExpenses: any;

    @observable
    wardrobePriority: any;

    @observable
    unexpectedExpensesPriority: any;
    
}

export default DataInputSore;