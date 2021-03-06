import {Page, NavController} from 'ionic-angular';
import {GeneralService} from './../../management/generalService';
import {TeamPage} from './../teamPage/teamPage';


@Page({
    templateUrl: 'build/pages/tournamentPage/tournamentPage.html',
    providers: [GeneralService]
})
export class TournamentPage {

    constructor(private _generalService:GeneralService, private _nav:NavController) {
        // to navigate 
        // http://www.joshmorony.com/a-simple-guide-to-navigation-in-ionic-2/
        // this._nav.push(SecondPage);
    }

    tournamentData:JSON;
    tournamentStartDate:number;
    tournamentEndDate:number;

    onPageWillEnter() {
        this.tournamentData = this._generalService.GetTournamentData();

        this._generalService.UpdateTournamentData((testStatus, errorThrown) => {
            //update error handle
            alert(`Couldn't retrieve data. testStatus: ${testStatus} errorThrown: ${errorThrown}`);
        }, (dataWasUpdated:boolean) => { //finish callback
            this.tournamentData = this._generalService.GetTournamentData();
        });

        this.tournamentStartDate = Date.parse(this.tournamentData["StartDate"]);
        this.tournamentEndDate = Date.parse(this.tournamentData["EndDate"]);
    }

    goToTeam(teamId:number) {
        console.log('clicked go to team page with id: ' + teamId);
        this._nav.push(TeamPage, {
            teamId: teamId
        });
    }
}
