import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class TrailingSlashUrlSerializer extends DefaultUrlSerializer {
  private static _withTrailingSlash(url: string): string {
    const splitOn = url.indexOf('?') > -1 ? '?' : '#';
    const pathArr = url.split(splitOn);

    if (!pathArr[0].endsWith('/')) {
      const fileName: string = url.substring(url.lastIndexOf('/') + 1);
      if (fileName.indexOf('.') === -1) {
        pathArr[0] += '/';
      }
    }
    return pathArr.join(splitOn);
  }

  serialize(tree: UrlTree): string {
    return TrailingSlashUrlSerializer._withTrailingSlash(super.serialize(tree));
  }
}
