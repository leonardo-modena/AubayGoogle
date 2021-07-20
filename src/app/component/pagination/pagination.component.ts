import {Component, OnInit} from '@angular/core';
import {ResearchConnectorService} from "../../service/research-connector.service";
import {EventService} from "../../service/event.service";


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  link: string[] = [];

  first!: string;
  last!: string;

  constructor(private researchService: ResearchConnectorService, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.researchService.link.subscribe(res => {
      if (res) {
        this.link = res.split(',');

        let parts = res.split(',');
        const links = {};
        parts.forEach(p => {
          let section = p.split(';');
          const url = section[0].replace(/<(.*)>/, '$1').trim();
          const name = section[1].replace(/rel="(.*)"/, '$1').trim();
          // @ts-ignore
          links[name] = url;

        });
        // console.log(links);
        // @ts-ignore
        this.first = links['first'];
        // @ts-ignore
        this.last = links['last'];
        // console.log(this.first);
        // console.log(this.last);
      }
    });
  }

  onPageChanged(pageIndex: string | number) {
    if (typeof pageIndex === 'string') {
      if (pageIndex === 'first') {
        this.eventService.emitLink(this.first);
      } else {
        this.eventService.emitLink(this.last);
      }
    }
  }

}
