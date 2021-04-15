
import { DefaultButton, PrimaryButton, Stack } from 'office-ui-fabric-react';
import * as React from 'react';



export interface PaginationProps{
    currentPage: number;
    totalPages: number;
    onChange;


}
export interface PaginationState{
    actualPage: number;
}

export function _onChange(){

}

export default class PaginationClass extends React.Component<PaginationProps, PaginationState>{
    constructor(props: PaginationProps){
        super(props);

       this.state={
           actualPage: props.currentPage
       };

    }


    public render(){
        const{actualPage}=this.state;
        //Setting first page when changing total pages on the go (i.e. filtering on a list and altering number of elements)
        if(actualPage != this.props.currentPage) this._onFirst();
        return(
            <div>
                <Stack horizontal horizontalAlign="center">
                    <PrimaryButton key='firstPage' onClick={() => this._onFirst()}  iconProps={{iconName: 'doubleChevronLeft'}} allowDisabledFocus disabled={false} width='auto'/>
                    <PrimaryButton key='back' onClick={() => this._onBack()}  iconProps={{iconName: 'ChevronLeft'}} allowDisabledFocus disabled={false} width='auto'/>
                    <DefaultButton key='actual' allowDisabledFocus disabled={true}> Page {actualPage} of {this.props.totalPages} </DefaultButton>
                    <PrimaryButton key='forward' onClick={() => this._onForward()}  iconProps={{iconName: 'ChevronRight'}} allowDisabledFocus disabled={false} width='auto'/>
                    <PrimaryButton key='lastPage'onClick={() => this._onLast()}  iconProps={{iconName: 'doubleChevronRight'}} allowDisabledFocus disabled={false} width='auto'/>
                </Stack>
            </div>

        );
    }

    private _onFirst(){
        if(this.state.actualPage != 1){
            let newpage = 1;
            this.setState({
                actualPage: newpage
            });

            this.props.onChange(newpage);
        }

    }
    private _onLast(){
        if(this.state.actualPage != this.props.totalPages){
            let newpage = this.props.totalPages;
            this.setState({
                actualPage: newpage
            });

            this.props.onChange(newpage);
        }

    }
    private _onBack(){
        if(this.state.actualPage != 1){
            let newpage = this.state.actualPage;
            newpage--;
            this.setState({
                actualPage: newpage
            });

            this.props.onChange(newpage);
        }
        

    }
    private _onForward(){
        if(this.state.actualPage < this.props.totalPages){
            let newpage = this.state.actualPage;
            newpage++;
            this.setState({
                actualPage: newpage
            });

            this.props.onChange(newpage);
        }

    }

    

}
