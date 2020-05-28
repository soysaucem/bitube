import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from 'immutable';
import { ENTER, COMMA } from '../../util/variables';
import { MatChipInputEvent } from '@angular/material/chips';

export interface VideoEditingData {
  dialogTitle: string;
  title: string;
  description: string;
  tags: List<string>;
}

@Component({
  selector: 'app-video-editing-dialog',
  templateUrl: './video-editing-dialog.component.html',
  styleUrls: ['./video-editing-dialog.component.scss'],
})
export class VideoEditingDialogComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public dialogRef: MatDialogRef<VideoEditingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VideoEditingData
  ) {}

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  async addTag(event: MatChipInputEvent): Promise<void> {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.data.tags = this.data.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.data.tags.indexOf(tag);

    if (index >= 0) {
      this.data.tags = this.data.tags.splice(index, 1);
    }
  }
}
