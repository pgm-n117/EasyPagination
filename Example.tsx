import { Text } from "@microsoft/sp-core-library";
import { Announced, classNamesFunction, CommandBar, DetailsList, DetailsListLayoutMode, IColumn, ICommandBarItemProps, SelectionMode, TextField, Selection, OverflowSet, IOverflowSetStyleProps, CommandButton, IOverflowSetItemProps, CommandBarButton, themeRulesStandardCreator, IContextualMenuItem, ThemeSettingName, SearchBox, Label, ISearchBoxStyles, Stack } from "office-ui-fabric-react";
import * as React from "react";
import Pages from "Pagination";


export interface ExampleProps{
    

}

export interface ExampleState{
	items: string[];
    //pagination
    page: number;
    index: number;
    pageCount: number;
}



export default class Example extends React.Component<ExampleProps, ExampleState>{


    constructor(props: ListadoEmpleadosRRHHProps){
        super(props);
        this._allItems = _generateItems();
		
		
		//use this sencente to bind the state
        this._onPageChange = this._onPageChange.bind(this);

		//Pagination by 10 elements per page
        let totalPages;
        if(this._allItems.length % 10 != 0){
            totalPages = Math.floor(this._allItems.length / 10)+1;
        }else{
            totalPages = Math.floor(this._allItems.length / 10);
        }
        
        



        //Initial State
        this.state = {
            items: this._allItems,
            //pagination
            page: 1,
            index: 0,
            pageCount: totalPages,
            
        };
    

    }

    public render(){
        const {items, index, page, pageCount} = this.state;
        return(
            <div>

                    <DetailsList
                        styles = {searchBoxStyles}
                        items ={items.slice(index, index+10)}
                        compact={false}
                        
                        selectionMode={SelectionMode.single}
                        ariaLabelForSelectionColumn={"Selecciona"}
                        setKey="none"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        onItemInvoked={this._onItemInvoked}
                        selectionPreservedOnEmptyClick={false}                       
                    />

                    
                    <Pages
                        currentPage={page}
                        totalPages={pageCount}
                        onChange={(newpage: number) => this._onPageChange(newpage)}
                    />
            </div>

        );
        
    }

    private _onPageChange(page){
        this.setState({
            page: page,
            index: (page-1)*10,
            selectionDetails: null
        });
    }



//Testing code - filling details list


function _generateItems(): string[] {
    //throw new Error("Function not implemented.");
    const items : string[] = [];

    for(let i = 0; i<  59; i++){
        const randomDate1 = _randomDate(new Date(2012, 0, 1), new Date()).toString();
        const randomDate2 = _randomDate(new Date(2012, 0, 1), new Date()).toString();
        let A = _lorem(1);
        let B = _lorem(1);
        let C = _lorem(1);
        A = A.charAt(0).toUpperCase()+A.slice(1);
        B = B.charAt(0).toUpperCase()+B.slice(1);
        C = C.charAt(0).toUpperCase()+C.slice(1);

        items.push({
            A: A,
            B: B,
            C: C,
            Date1: randomDate1.dateFormatted,
            Date2: randomDate2.dateFormatted,
        });


    }

    return items;
}


function _randomDate(start: Date, end: Date): { value: number; dateFormatted: string } {
    const date: Date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return {
      value: date.valueOf(),
      dateFormatted: date.toLocaleDateString(),
    };
  }

  
const LOREM_IPSUM = (
    'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
    'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
    'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
    'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt '
    ).split(' ');

let loremIndex = 0;

function _lorem(wordCount: number): string {
    const startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
    loremIndex = startIndex + wordCount;
    return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
}