"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
    place: z.string({
        required_error: "Vui lòng chọn địa điểm.",
    }),
    type: z.string({
        required_error: "Vui lòng chọn loại bđs.",
    }),
    area: z.string({
        required_error: "Vui lòng chọn diện tích.",
    }),
    price: z.string({
        required_error: "Vui lòng chọn giá thuê mong muốn.",
    }),
})

export default function SelectForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // })
        console.log(JSON.stringify(data, null, 2))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="py-8 flex items-end justify-between">
                <FormField
                    control={form.control}
                    name="place"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Địa điểm</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-48 h-7">
                                        <SelectValue placeholder="Chọn" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="a">a</SelectItem>
                                    <SelectItem value="b">b</SelectItem>
                                    <SelectItem value="c">c</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Loại bất động sản</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-48 h-7">
                                        <SelectValue placeholder="Chọn" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="a">a</SelectItem>
                                    <SelectItem value="b">b</SelectItem>
                                    <SelectItem value="c">c</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Diện tích</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-48 h-7">
                                        <SelectValue placeholder="Chọn" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="a">a</SelectItem>
                                    <SelectItem value="b">b</SelectItem>
                                    <SelectItem value="c">c</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Giá tiền thuê/tháng</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-48 h-7">
                                        <SelectValue placeholder="Chọn" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="a">a</SelectItem>
                                    <SelectItem value="b">b</SelectItem>
                                    <SelectItem value="c">c</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">TÌM KIẾM</Button>
            </form>
        </Form>
    )
}
