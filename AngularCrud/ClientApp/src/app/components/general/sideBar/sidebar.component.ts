import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SideBarComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadScript('assets/javascript/javascript.js');
  }

  loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      console.log(`Script ${src} loaded successfully.`);
    };
    script.onerror = () => {
      console.error(`Error loading script ${src}.`);
    };
    this.renderer.appendChild(document.body, script);
  }

  logout() {
    localStorage.clear();
    setTimeout(() => {
      location.href = '';
    }, 500);
  }
}
