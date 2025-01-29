import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-blog',
	imports: [RouterOutlet],
	templateUrl: './blog.component.html',
	styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
	router = inject(Router);



	ngOnInit() {
		console.log('Parent Blog ngOnInit')

	}

	goToBlogPost(id: string) {
		this.router.navigateByUrl(`/blog/${id}`);
	}
}
