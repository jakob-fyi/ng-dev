import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const MAIN_ROUTES: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'demos',
                loadChildren: () =>
                    import('../demos/demo.routes').then((m) => m.DEMO_ROUTES),
            },
            {
                path: 'skills',
                loadChildren: () =>
                    import('../skills/skills.routes').then(
                        (m) => m.SKILL_ROUTES
                    ),
            },
        ]
    }
];
