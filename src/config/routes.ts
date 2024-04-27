import Index from "../pages/Index.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import SearchResult from "../pages/SearchResult.vue";
import UserLogin from "../pages/UserLogin.vue";
import Team from "../pages/Team.vue";
import TeamAdd from "../pages/TeamAdd.vue";
import MyTeam from "../pages/MyTeams.vue";


const routes = [
    {path: '/' , component: Index},
    {path: '/team', component: Team},
    {path: '/user', component: User},
    {path: '/search', component: Search},
    {path: '/user/edit', component: UserEdit},
    {path: '/user/list', component: SearchResult},
    {path: '/user/login', component: UserLogin},
    {path: '/team/add', component: TeamAdd},
    {path: '/team/my', component: MyTeam},


]

export default routes