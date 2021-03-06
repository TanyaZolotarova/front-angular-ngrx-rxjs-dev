import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {IUserData} from "../../shared/models/user.data";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {ApiService} from "../../shared/services/api.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {LoadListUsers} from "../../store/actions/user.actions";
import {
    SelectionDeleteRequest,
    SelectionListRequest,
    SelectionUpdateRequest
} from "../../store/actions/selection.actions";
import {getLocaleFirstDayOfWeek} from "@angular/common";
import {ISelectionData} from "../../shared/models/selection.data";
import {TestData} from "../../shared/models/test.data";

// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];

@Component({
    selector: 'app-assets-page',
    templateUrl: './assets-page.component.html',
    styleUrls: ['./assets-page.component.css']
})


export class AssetsPageComponent implements OnInit, AfterViewInit, OnDestroy {

    displayedColumns: string[] = ['select', 'img', 'id', 'assets'];
    dataSource: MatTableDataSource<IUserData>;
    selection = new SelectionModel<IUserData>(true, []);

    public subscriptions: Array<Subscription> = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public users: IUserData[];
    public selectedTest = []; // TODO I
    public pageIndex: any;
    public pageSize: any;
    // public test: any = [];
    private state: any;

    constructor(
        private api: ApiService,
        private store: Store
    ) {
        console.warn(' selection = new SelectionModel', this.selection)
        // Create 100 users
        // const usersName = Array.from({length: 50}, (_, k) => this.createNewUser(k + 1));

    }
    ngOnInit(): void {
        this.load();
        this.loadSelect();

        this.subscriptions.push(
            this.store.select(state => this.state = state)
                .subscribe(
                    () => {
                        console.log('this.state!!!!', this.state);
                        this.users = this.state.users.users;
                        const selectedData = this.state.select.select;
                        // const usersWithKey = this.users;

                        // console.warn('selectedData', selectedData)
                        // console.warn('users1', this.users)
                        // selectedData.map(addUser => {
                        //   console.warn('addUSer', addUser)
                        // })
                        // console.warn('users2', this.users)

                        // if(selectedData) {
                        //     selectedData.forEach(check => {
                        //         this.selection.isSelected(check)
                        //     })
                        //     this.selection.select(...selectedData);
                        //     // this.selection.isSelected(row)
                        // }
                        // if (this.selectedData.length) {
                        // this.selected.forEach(data => {
                        //         // console.log('data', data)
                        //         // this.selected.push(data._id);
                        //     });
                        // }
                        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', this.selectedData);
                        this.dataSource = new MatTableDataSource(this.users);
                    }
                ));

        // setTimeout(() => this.newArray(), 1000)

    }

    public load(): void {
        this.store.dispatch(new LoadListUsers());
    }

    public loadSelect(): void {
        this.store.dispatch(new SelectionListRequest());
    }

    public toggleChange(event, row) {
        if (event.checked === true) {
            console.warn(row)
            this.store.dispatch(new SelectionUpdateRequest([row._id]));
        } else {
            this.store.dispatch(new SelectionDeleteRequest([row._id]));
        }
    }

    newArray() {
        let usersWithKey = [...this.users];
        let newArray = [];

        usersWithKey.map(user => {
            newArray.push({...user, 'add': false})
        })


        this.users = newArray
        this.dataSource = new MatTableDataSource(this.users);

    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public getServerData(event?: PageEvent) {
        console.log('getServerData');
    }

    // createNewUser(_id: number): IUserData {
    //     // const Names = this.state.users
    //     // console.warn(123456, Names)
    //
    //     // const names = this.users[Math.round(Math.random() * (this.users.length - 1))] + ' ' +
    //     //   this.users[Math.round(Math.random() * (this.users.length - 1))].charAt(0) + '.';
    //
    //     return {
    //         _id: _id,
    //         assets: name,
    //     };
    // }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
        console.warn('%%%%%%%%%%%%%%%%%%5this.selection', this.selection)
    }

    checkboxLabel(row?: IUserData): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}



