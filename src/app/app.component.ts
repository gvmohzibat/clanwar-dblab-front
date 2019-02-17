import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  // private _username = 'test2';
  public get username() {
    return localStorage.getItem('username');
  }
  public set username(value) {
    localStorage.setItem('username', value);
  }
  user_id: string;
  email: string;
  error: any;
  clan_id: string;
  admin_id: string;
  users: any[][] = [];
  clans: any[][] = [];
  clanRankings: any[][] = [];
  sort_by: any;
  order_by: any;
  job: any;
  role: any;
  attacker_id: any;
  defender_id: any;
  // _uid: any;
  _userClanid: any;
  motto: any;
  building_type: any;
  clanUsers: any;
  clanBuildings: any;
  buildings: any;
  warInfo: any;
  roles: any;
  jobs: any;
  jobTypes: any;
  roleTypes: any;
  types: any;
  buildingTypes: any;
  wars: any;
  constructor(private http: HttpClient) {
    if (!this.username) {
      this.username = 'test2';
    }
    // this.username = 'test2';
  }
  ngOnInit() {
    this.selectUser();
    setInterval(() => {
      this.init();
    }, 15000);
  }
  ngAfterViewInit() {
    const sections = Array.from(document.getElementsByTagName('section'));
    sections.forEach(s =>
      s.addEventListener('click', ev => {
        s.classList.toggle('collapseit');
      })
    );
  }
  init() {
    this.getUsers();
    this.getClans();
    this.getClanUsers();
    this.getClanBuildings();
    this.getBuildings();
    this.getWarInfo();
    this.getRoles();
    this.getJobs();
    this.getJobTypes();
    this.getRoleTypes();
    this.getTypes();
    this.getBuildingTypes();
    this.getWars();
    this.getUserClan();
  }
  getUsers() {
    this.request('get_users').subscribe(d => {
      this.users = d;
    });
  }
  getClans() {
    this.request('get_clans').subscribe(d => {
      this.clans = d;
    });
  }
  getClanUsers() {
    this.request('get_clan_users').subscribe(d => {
      this.clanUsers = d;
    });
  }
  getClanBuildings() {
    this.request('get_clan_buildings').subscribe(d => {
      this.clanBuildings = d;
    });
  }
  getBuildings() {
    this.request('get_buildings').subscribe(d => {
      this.buildings = d;
    });
  }
  getWarInfo() {
    this.request('get_war_info').subscribe(d => {
      this.warInfo = d;
    });
  }
  getRoles() {
    this.request('get_roles').subscribe(d => {
      this.roles = d;
    });
  }
  getJobs() {
    this.request('get_jobs').subscribe(d => {
      this.jobs = d;
    });
  }
  getJobTypes() {
    this.request('get_job_types').subscribe(d => {
      this.jobTypes = d;
    });
  }
  getRoleTypes() {
    this.request('get_role_types').subscribe(d => {
      this.roleTypes = d;
    });
  }
  getTypes() {
    this.request('get_types').subscribe(d => {
      this.types = d;
    });
  }
  getBuildingTypes() {
    this.request('get_building_types').subscribe(d => {
      this.buildingTypes = d;
    });
  }
  getWars() {
    this.request('get_wars').subscribe(d => {
      this.wars = d;
    });
  }
  getUserClan() {
    this.request('get_user_clan').subscribe(d => {
      this._userClanid = d;
    });
  }

  createUser() {
    this.request('create_user', { username: this.username, email: this.email }).subscribe(d => {
      this.user_id = d;
      this.init();
    });
  }
  selectUser() {
    this.request('select_user', { username: this.username }).subscribe(d => {
      this.user_id = d;
      this.init();
    });
  }
  getClansRanking() {
    this.request('get_clan_ranking', { order_by: this.order_by, sort_by: this.sort_by }).subscribe(d => {
      this.clanRankings = d;
      this.init();
    });
  }
  joinClan() {
    this.request('join_clan', { admin_id: this.admin_id, clan_id: this.clan_id }).subscribe(d => {
      this.init();
    });
  }
  changeJob() {
    this.request('change_user_job', { new_job: this.job }).subscribe(d => {
      this.init();
    });
  }
  changeRole() {
    this.request('change_user_role', { new_role: this.role, clan_id: this.clan_id, admin_id: this.admin_id }).subscribe(d => {
      this.init();
    });
  }
  attack() {
    this.request('attack', { attacker_id: this.attacker_id, defender_id: this.defender_id }).subscribe(d => {
      this.init();
    });
  }
  changeMotto() {
    this.request('change_motto', { motto: this.motto, clan_id: this.clan_id }).subscribe(d => {
      this.init();
    });
  }
  changeActiveBuilding() {
    this.request('change_active_building', { building_type: this.building_type, clan_id: this.clan_id }).subscribe(d => {
      this.init();
    });
  }

  request(path: string, params = {}): Observable<any> {
    return this.http.get<any>(`${API_URL}/${path}`, { params: { uid: this.user_id, ...params } }).pipe(
      catchError(e => {
        this.error = e;
        console.log('this.error', this.error);
        return throwError(e);
      }),
      tap(d => console.log(d))
    );
  }
}

const API_URL = 'http://172.30.49.86:8000/api/v1/clanwar';
