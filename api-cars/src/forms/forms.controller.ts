import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException } from '@nestjs/common';
import { FormsService } from './forms.service';
import { Form } from './schema/form.schema';

@Controller('forms')
export class FormsController {
    constructor(private readonly formService: FormsService) {}

    @Post()
    async createForm(@Body() form: Form): Promise<Form> {
        return this.formService.createCar(form);
    }

    @Get()
    async getAllForm(): Promise<Form[]> {
        return this.formService.getAllForm();
    }

    @Get(':id')
    async getForm(@Param('id') id: string): Promise<Form> {
        const form = await this.formService.getForm(id);
        if (!form) {
            throw new NotFoundException('Form not found');
        }
        return form;
    }

    @Put(':id')
    async updateForm(@Param('id') id: string, @Body() form: Form): Promise<Form> {
        const updateForm = await this.formService.updateForm(id, form);
        if (!updateForm) {
            throw new NotFoundException('Form not found');
        }
        return updateForm;
    }

    @Delete(':id')
    async deleteForm(@Param('id') id: string): Promise<void> {
        const deleteForm = await this.formService.deleteForm(id);
        if (!deleteForm) {
            throw new NotFoundException('Form not found');
        }
    }
}